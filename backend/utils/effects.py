from moviepy import VideoFileClip, CompositeVideoClip
import moviepy.video.fx as vfx
import os

# Resolução máxima para processamento — 480p é ótimo p/ mobile e muito mais rápido
MAX_HEIGHT = 480

def apply_video_effects(input_path, output_path, effect=None, template=None, text=None, audio_effect=None):
    try:
        clip = VideoFileClip(input_path)

        # 1. Limitar duração a 30s
        if clip.duration > 30:
            clip = clip.subclipped(0, 30)

        # 2. Reduzir resolução para MAX 480p (enorme ganho de velocidade)
        if clip.size[1] > MAX_HEIGHT:
            scale_factor = MAX_HEIGHT / clip.size[1]
            new_w = int(clip.size[0] * scale_factor)
            # Garantir dimensões pares (exigido pelo libx264)
            new_w = new_w if new_w % 2 == 0 else new_w - 1
            clip = clip.resized((new_w, MAX_HEIGHT))

        # 3. Aplicar efeito visual
        if effect == "vintage":
            clip = vfx.BlackAndWhite().apply(clip)
        elif effect == "glitch":
            clip = vfx.MirrorX().apply(clip)
        elif effect == "saturation":
            clip = vfx.MultiplyColor(2.0).apply(clip)
        elif effect == "blackwhite":
            clip = vfx.BlackAndWhite().apply(clip)

        processed_clip = clip

        # 4. Exportar com configurações ultra-rápidas
        #    preset ultrafast       -> codificação muito mais veloz (menos compressão, mais rápido)
        #    threads=4              -> usa múltiplos núcleos do processador
        #    fps_source="fps"       -> evita recalcular FPS
        processed_clip.write_videofile(
            output_path,
            codec="libx264",
            audio_codec="aac",
            preset="ultrafast",   # KEY: muito mais rápido que o padrão 'medium'
            threads=4,
            fps=24,               # 24fps é suficiente e mais rápido que 30/60
            logger=None,
        )

        clip.close()
        processed_clip.close()

        return True
    except Exception as e:
        print(f"[ERRO] apply_video_effects: {e}")
        return False
