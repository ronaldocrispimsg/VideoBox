import psycopg2
import moviepy.editor as mp

# Conectar ao banco de dados PostgreSQL
conn = psycopg2.connect(
    host="localhost", 
    database="videobox_db", 
    user="videobox", 
    password="123456"
)

cur = conn.cursor()

# Criação da tabela para armazenar metadados dos vídeos
cur.execute("""
    CREATE TABLE IF NOT EXISTS video_metadata (
        id SERIAL PRIMARY KEY,
        video_name VARCHAR(255),
        duration FLOAT,
        resolution VARCHAR(20),
        fps FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")
conn.commit()

# Função para extrair e armazenar os metadados de um vídeo
def store_video_metadata(video_path):
    # Carregar o vídeo com moviepy
    video = mp.VideoFileClip(video_path)
    
    # Obter os metadados do vídeo
    video_name = video_path.split('/')[-1]
    duration = video.duration
    resolution = f"{video.w}x{video.h}"
    fps = video.fps
    
    # Inserir no banco de dados
    cur.execute("""
        INSERT INTO video_metadata (video_name, duration, resolution, fps)
        VALUES (%s, %s, %s, %s)
    """, (video_name, duration, resolution, fps))
    conn.commit()

    print(f"Metadados do vídeo '{video_name}' armazenados com sucesso!")

# Exemplo de uso
store_video_metadata('caminho/do/seu/video.mp4')

# Fechar a conexão
cur.close()
conn.close()
