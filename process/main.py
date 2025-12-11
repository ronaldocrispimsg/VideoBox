import os
import asyncio
import subprocess
import shutil
from faststream import FastStream
from faststream.rabbit import RabbitBroker

# URL do RabbitMQ (use o IP PRIVADO)
RABBIT_URL = os.getenv("RABBIT_URL", "amqp://videobox:123456@10.x.x.x/")

# Onde o PROCESS cria os arquivos HLS temporários
TMP_HLS = "/tmp/hls"
os.makedirs(TMP_HLS, exist_ok=True)

# Onde o repositório de stream armazenará o vídeo FINAL
# (server NGINX servindo esta pasta)
STREAM_PATH = "/var/www/html/streams"
os.makedirs(STREAM_PATH, exist_ok=True)

# IP público da instância stream_repo → FRONTEND vai acessar esse IP
STREAM_IP = os.getenv("STREAM_IP", "SEU_IP_STREAM_REPO")

broker = RabbitBroker(RABBIT_URL)
app = FastStream(broker)


@broker.subscriber("video.uploaded")
async def process_video(event):
    video_id = event["video_id"]
    path_original = event["path"]

    print(f"[process] Vídeo recebido: {video_id}")
    print(f"[process] Caminho original: {path_original}")

    # -----------------------------
    # 1) CRIAR PASTA TEMPORÁRIA DO VÍDEO
    # -----------------------------
    video_temp_dir = os.path.join(TMP_HLS, video_id)
    os.makedirs(video_temp_dir, exist_ok=True)

    # -----------------------------
    # 2) TRANSCODE REAL COM FFMPEG → HLS
    # -----------------------------
    print("[process] Iniciando transcode REAL...")

    playlist_path = os.path.join(video_temp_dir, "playlist.m3u8")

    cmd = [
        "ffmpeg",
        "-i", path_original,                # entrada
        "-codec:v", "h264",                 # vídeo H264
        "-codec:a", "aac",                  # áudio AAC
        "-start_number", "0",
        "-hls_time", "4",
        "-hls_list_size", "0",
        "-f", "hls",
        playlist_path                       # saída
    ]

    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    if result.returncode != 0:
        print("[process] ERRO NO FFMPEG:")
        print(result.stderr.decode())
        return

    print("[process] Transcode FINALIZADO com sucesso.")

    # -----------------------------
    # 3) COPIAR PARA O STREAM_REPO (NGINX SERVE DAQUI)
    # -----------------------------
    stream_video_dir = os.path.join(STREAM_PATH, video_id)

    # Se já existe pasta antiga, remove
    if os.path.exists(stream_video_dir):
        shutil.rmtree(stream_video_dir)

    shutil.copytree(video_temp_dir, stream_video_dir)

    print(f"[process] HLS copiado para: {stream_video_dir}")

    # -----------------------------
    # 4) URL final de stream (para o frontend)
    # -----------------------------
    stream_url = f"http://{STREAM_IP}/streams/{video_id}/playlist.m3u8"

    print("[process] URL final:", stream_url)

    # -----------------------------
    # 5) ENVIAR EVENTO 'video.ready' PARA O BACKEND
    # -----------------------------
    await broker.publish(
        {
            "video_id": video_id,
            "stream_url": stream_url,
            "status": "ready"
        },
        routing_key="video.ready"
    )

    print("[process] Evento video.ready enviado ao backend.")

