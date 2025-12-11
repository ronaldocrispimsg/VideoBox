import os
from aiohttp import web
from faststream import FastStream
from faststream.rabbit import RabbitBroker
import uuid
import aiofiles

# RABBITMQ
RABBIT_URL = os.getenv("RABBIT_URL", "amqp://videobox:123456@IP_RABBITMQ/")

# Diretório onde o backend salva os vídeos brutos
VIDEO_STORAGE = "/home/ubuntu/videos_raw"
os.makedirs(VIDEO_STORAGE, exist_ok=True)

broker = RabbitBroker(RABBIT_URL)
stream_app = FastStream(broker)

routes = web.RouteTableDef()


@routes.post("/upload")
async def upload(request):
    reader = await request.multipart()

    video_part = await reader.next()
    filename = f"{uuid.uuid4()}_{video_part.filename}"
    filepath = os.path.join(VIDEO_STORAGE, filename)

    # salva arquivo
    async with aiofiles.open(filepath, "wb") as f:
        while True:
            chunk = await video_part.read_chunk()
            if not chunk:
                break
            await f.write(chunk)

    payload = {
        "video_id": filename,
        "path": filepath
    }

    # publica evento
    await broker.publish(payload, routing_key="video.uploaded")

    return web.json_response({"status": "received", "video_id": filename})


# Recebe evento de processamento finalizado
@broker.subscriber("video.ready")
async def ready(event):
    print("[backend] vídeo pronto:", event)


@routes.get("/health")
async def health(request):
    return web.json_response({"status": "ok"})


# Integração FastStream + aiohttp
from faststream.aiohttp import AiohttpRouter

aio_app = web.Application()
aio_app.add_routes(routes)

AiohttpRouter(aio_app, stream_app)


if __name__ == "__main__":
    web.run_app(aio_app, port=8000)

