from moviepy import ImageClip, CompositeVideoClip

def add_sticker(clip, sticker_path, position=('right', 'top'), duration=None):
    """
    Overlay a sticker image on the video clip.
    """
    if not duration:
        duration = clip.duration
        
    sticker = (ImageClip(sticker_path)
               .set_duration(duration)
               .resize(height=clip.h/4) # Scale to 25% of height
               .set_pos(position))
               
    return CompositeVideoClip([clip, sticker])
