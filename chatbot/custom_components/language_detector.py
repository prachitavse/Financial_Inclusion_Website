from langdetect import detect
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class ActionDetectLanguage(Action):
    def name(self) -> str:
        return "action_detect_language"

    def run(self, dispatcher, tracker, domain):
        user_message = tracker.latest_message.get('text')
        language = detect(user_message)
        return [SlotSet("language", language)]

