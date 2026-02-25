import json
import os
from pathlib import Path
from gtts import gTTS

def generate_audio_files_gtts(json_file, output_base_dir='./audio'):
    import json, os
    from pathlib import Path
    from gtts import gTTS

    with open(json_file, 'r', encoding='utf-8') as f:
        phrases = json.load(f)

    # counter per context
    context_counters = {}

    for phrase in phrases:
        context = phrase['context']
        from_lang = phrase['from_lang']
        to_lang = phrase['to_lang']

        # init counter for new context
        if context not in context_counters:
            context_counters[context] = 1

        idx = context_counters[context]

        dir_path = os.path.join(output_base_dir, f"{from_lang}_{to_lang}", context)
        Path(dir_path).mkdir(parents=True, exist_ok=True)

        # source
        source_audio_path = os.path.join(
            dir_path,
            f"{idx:03d}_{from_lang}.mp3"
        )

        try:
            gTTS(text=phrase['source_text'], lang=from_lang).save(source_audio_path)
            # number of audio
            print(f"Saved {source_audio_path}")
        except Exception as e:
            print(f"Error source: {e}")

        # target
        target_audio_path = os.path.join(
            dir_path,
            f"{idx:03d}_{to_lang}.mp3"
        )

        try:
            gTTS(text=phrase['target_text'], lang=to_lang).save(target_audio_path)
        except Exception as e:
            print(f"Error target: {e}")

        # increment ONLY for this context
        context_counters[context] += 1


if __name__ == "__main__":
    generate_audio_files_gtts('sentences_en_de_beginner.json')