# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

from typing import Any, Text, Dict, List
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class ActionProvideFinanceEducation(Action):
    def name(self) -> Text:
        return "action_provide_finance_education"

    def run(self, dispatcher, tracker, domain) -> List[Dict[Text, Any]]:
        user_lang = tracker.get_slot("language") or "en"
        
        messages = {
            "en": "Financial planning involves budgeting, saving, and investing. What would you like to know more about?",
            "hi": "वित्तीय योजना में बजट, बचत और निवेश शामिल हैं। आप किसके बारे में अधिक जानना चाहेंगे?",
            "ta": "நிதி திட்டமிடல் என்பது திட்டமிடல், சேமிப்பு மற்றும் முதலீட்டை உள்ளடக்கியது. மேலும் எதைப் பற்றி அறிய விரும்புகிறீர்கள்?",
        }
        dispatcher.utter_message(text=messages.get(user_lang, messages["en"]))
        return []
