"""Regression tests for scripts/validate_mission.py (stdlib only).

Run from the repository root:
    python3 -m unittest discover -s tests -p 'test_validate_mission.py'
The fixture is synthetic and exists only to test structure; it is not course content.
"""
import copy
import unittest

from scripts.validate_mission import validate


def make_mission():
    data = {
        "schemaVersion": "1.0.0",
        "contentVersion": 1,
        "course": {"courseId": "test-course", "level": "A1", "language": "en-GB"},
        "unit": {"unitId": "test-unit", "courseId": "test-course", "position": 1, "title": "Test unit"},
        "mission": {"missionId": "test-mission", "unitId": "test-unit", "position": 1, "title": "Test mission"},
        "sections": [],
    }
    specs = [
        ("explore", "vocabulary_pairs", 10),
        ("practice", "mixed_practice", 20),
        ("grammar", "grammar", 10),
        ("pronunciation", "pronunciation_cards", 10),
        ("reading", "reading_comprehension", 10),
        ("writing", "dictation", 10),
        ("speaking", "speaking_prompts", 10),
        ("listening", "listening_gap_fill", 10),
    ]
    for position, (key, exercise_type, count) in enumerate(specs, 1):
        items = []
        for index in range(1, count + 1):
            item = {"itemId": f"test-{key}-item-{index:02d}", "position": index}
            if key == "explore":
                item.update(english=f"English {index}", spanish=f"Spanish {index}")
            elif key in ("practice", "grammar"):
                item.update(prompt=f"Prompt {index}", evaluation={"type": "exact"})
                if key == "practice":
                    item["taskType"] = "short_answer"
            elif key == "pronunciation":
                item.update(word=f"word{index}", translation=f"palabra{index}",
                            pronunciationGuide=f"guide{index}", audio=f"/audio/{index}.mp3")
            elif key == "reading":
                item.update(prompt=f"Reading question {index}", evaluation={"type": "single_choice"})
            elif key == "writing":
                item.update(audio=f"/audio/dictation-{index}.mp3", expectedAnswer=f"answer {index}",
                            evaluation={"type": "normalised_text"})
            elif key == "speaking":
                item.update(prompt=f"Say {index}", modelAnswer=f"Model {index}",
                            evaluation={"type": "transcription_feedback",
                                        "transcriptionSeparateFromPronunciation": True})
            elif key == "listening":
                item.update(gapToken=f"{{{{gap:{index}}}}}",
                            expectedWordId=f"test-listening-word-{index:02d}")
            items.append(item)
        exercise = {"exerciseId": f"test-{key}-exercise", "type": exercise_type, "items": items}
        if key == "reading":
            exercise["content"] = {"passageId": "test-reading-passage", "passage": "A complete synthetic passage."}
        if key == "listening":
            exercise["content"] = {
                "audio": "/audio/listening.mp3",
                "transcriptTemplate": " ".join(f"{{{{gap:{i}}}}}" for i in range(1, 11)),
                "wordBank": [
                    {"wordId": f"test-listening-word-{i:02d}", "word": f"word{i}"}
                    for i in range(1, 11)
                ],
            }
        data["sections"].append({
            "sectionId": f"test-{key}-section", "sectionKey": key,
            "position": position, "exercise": exercise,
        })
    return data


class MissionValidatorTests(unittest.TestCase):
    def test_complete_synthetic_mission_is_valid(self):
        self.assertEqual(validate(make_mission()), [])

    def test_practice_requires_exactly_twenty_items(self):
        data = make_mission()
        data["sections"][1]["exercise"]["items"].pop()
        self.assertTrue(any("se requieren 20 elementos" in issue for issue in validate(data)))

    def test_duplicate_item_id_is_rejected(self):
        data = make_mission()
        data["sections"][1]["exercise"]["items"][0]["itemId"] = data["sections"][0]["exercise"]["items"][0]["itemId"]
        self.assertTrue(any("ID duplicado" in issue for issue in validate(data)))

    def test_reading_requires_full_passage(self):
        data = make_mission()
        data["sections"][4]["exercise"]["content"]["passage"] = ""
        self.assertTrue(any("pasaje completo" in issue for issue in validate(data)))

    def test_listening_requires_ten_distinct_bank_words(self):
        data = make_mission()
        data["sections"][7]["exercise"]["items"][1]["expectedWordId"] = "test-listening-word-01"
        self.assertTrue(any("palabras distintas" in issue for issue in validate(data)))

    def test_speaking_keeps_transcription_separate(self):
        data = make_mission()
        data["sections"][6]["exercise"]["items"][0]["evaluation"]["transcriptionSeparateFromPronunciation"] = False
        self.assertTrue(any("debe separar transcripción" in issue for issue in validate(data)))


if __name__ == "__main__":
    unittest.main()
