from googletrans import Translator

def translateText(text):
	translator = Translator()
	return translator.translate(text, src='ja', dest='en').text

