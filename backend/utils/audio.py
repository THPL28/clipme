def apply_audio_effects(clip, audio_type):
    """
    Apply audio effects like high pitch, low pitch, or echo.
    """
    if audio_type == "chipmunk":
        return clip.fx(lambda c: c.speedx(1.5))
    elif audio_type == "deep":
        return clip.fx(lambda c: c.speedx(0.7))
    return clip
