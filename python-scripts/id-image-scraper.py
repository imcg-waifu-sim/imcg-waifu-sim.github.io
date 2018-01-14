import json
import urllib
import urllib2

from quoteScraper import *

from PIL import Image
import requests
from io import BytesIO
import os   # This is used to execute linux commands

begin = 101
last = 300

def printDefAr(charId, dirName, cardId, evolveId, status_num):

	if status_num == 3:
		# We assume that the card both has normal and evolve form

		# Print out the sub cards
		printSubCards(dirName, charId, cardId, evolveId, hasAudio)
		
		# Print out the main orignal cards

		print("['" + str(charId) + "','"+ str(evolveId)+"','" + dirName +"','no','main'],")
		print("['" + str(charId) + "','"+ str(cardId)+"','" + dirName +"','yes','main'],")
	else:
		print('Apparently there is no evolution or normal form')
		print('Status Num: ' + status_num)


def PILRetrieveImage(img_url, idNum, dirName, cardId, evolveId, hasAudio, status_num):
	# 0 = None for both non-idol & idolized
  	# 1 = Only non-idolized exist
    	# 2 = Only idolized exist
    	# 3 = Both non-idol & idolized exist

	hasAudioPath = 'no-audio'
	if hasAudio:
		hasAudioPath = 'audio'


	if status_num == 0:
		# If neither normal or evolved exists
		return


	# Check if new / unknown character
	intendPathURL = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ hasAudioPath +'/'+ str(dirName) 
	
	if not os.path.exists(intendPathURL):
		# If it doesn't exist, we make the directory
		commandMake = 'mkdir ' + intendPathURL
		os.system(commandMake)


	intendPathURL = '../../distribution/imcg-waifu-def-girl-images/scraped-images/'+ hasAudioPath +'/'+ str(dirName) 
	
	if not os.path.exists(intendPathURL):
		# If it doesn't exist, we make the directory
		commandMake = 'mkdir ' + intendPathURL
		os.system(commandMake)



	path_to_save = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ hasAudioPath + '/' +str(dirName) +'/' + str(cardId) +'.png'
	path_to_save_ev = '../../distribution/imcg-waifu-girl-images/scraped-images/' + hasAudioPath + '/' + str(dirName) + '/' + str(cardId) +'_ev.png'


	path_to_save_def = '../../distribution/imcg-waifu-def-girl-images/scraped-images/'+ hasAudioPath + '/' +str(dirName) +'/0.png'
	path_to_save_ev_def = '../../distribution/imcg-waifu-def-girl-images/scraped-images/' + hasAudioPath + '/' + str(dirName) + '/0_ev.png'

	response = requests.get(img_url)
	img = Image.open(BytesIO(response.content))
	img.save(path_to_save)
	img.save(path_to_save_def)
	img.close()

	if status_num == 3:
		# There is an evolution from
		card_url = 'https://starlight.kirara.ca/api/v1/card_t/' + str(evolveId)
		data = json.load(urllib2.urlopen(card_url))
		'''
		evolveId = data['result'][0]['evolution_id']
		romanName = data['result'][0]['chara']['conventional']
		'''
		cardURL = data['result'][0]['card_image_ref']
		imageURL = data['result'][0]['sprite_image_ref']
		iconURL = data['result'][0]['icon_image_ref']

		
		response = requests.get(imageURL)
		img = Image.open(BytesIO(response.content))
		img.save(path_to_save_ev)
		img.save(path_to_save_ev_def)
		img.close()

	# Below, we insert some code to extract quotes and audio clips
	extractQuotes(dirName, idNum, cardId, evolveId, hasAudio, True)
	spriteExtract(dirName, idNum, cardId, evolveId, hasAudio)
	posterExtract(dirName, idNum, cardId, evolveId, hasAudio)


for x in range(begin, last+1):
	x_str = str(x)

	temp_str = 'https://starlight.kirara.ca/api/v1/char_t/' + x_str
	data = json.load(urllib2.urlopen(temp_str))

	if data['result'][0] is None:
		continue


	japName = data['result'][0]['name']
	kanaName = data['result'][0]['name_kana']

	baseCardId = data['result'][0]['base_card_id']


	card_url = 'https://starlight.kirara.ca/api/v1/card_t/' + str(baseCardId)
	data = json.load(urllib2.urlopen(card_url))

	evolveId = data['result'][0]['evolution_id']
	romanName = data['result'][0]['chara']['conventional']
	firstName = romanName.split()[-1].lower()
	dirName = romanName.replace(" ", "_")

	cardURL = data['result'][0]['card_image_ref']
	imageURL = data['result'][0]['sprite_image_ref']
	iconURL = data['result'][0]['icon_image_ref']


	hasAudio = audioExists(baseCardId)


	if int(evolveId) == 0:
		# That means there is no evolution form
		print('SOMEHOW YOU ENTERED HERE, THIS IS UNEXPECTED')
		PILRetrieveImage(imageURL, x_str, dirName.lower(), baseCardId,'None', hasAudio, 1)

		if hasAudio:
			print("['" + x_str + "','"+ baseCardId+"','" + dirName.lower() +"','no'],")





	else:
		# We are mainly working with this
		# There is evolution form

		
		# If we only want to print the array
		if hasAudio:
			printDefAr(x_str, dirName.lower(), baseCardId, evolveId, 3)

		'''
		PILRetrieveImage(imageURL, x_str, dirName.lower(), baseCardId, evolveId, hasAudio, 3)

		if hasAudio:
			# These values (baseCardID, evolveID) are flipped to maintain consistancy with javascirpt code
			print("['" + x_str + "','"+ str(evolveId)+"','" + dirName.lower() +"','no','main'],")
			print("['" + x_str + "','"+ str(baseCardId)+"','" + dirName.lower() +"','yes','main'],")

		'''
