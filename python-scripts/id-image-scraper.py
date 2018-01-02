import json
import urllib
import urllib2

from PIL import Image
import requests
from io import BytesIO
import os   # This is used to execute linux commands

begin = 101
#last = 

def PILRetrieveImage(img_url, idNum, dirName, evolveId, status_num):
	# 0 = None for both non-idol & idolized
  	# 1 = Only non-idolized exist
    	# 2 = Only idolized exist
    	# 3 = Both non-idol & idolized exist

	if status_num == 0:
		# If neither normal or evolved exists
		return


	# Check if new / unknown character
	intendPathURL = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ str(dirName) 
	
	if not os.path.exists(intendPathURL):
		# If it doesn't exist, we make the directory
		commandMake = 'mkdir ' + intendPathURL
		os.system(commandMake)


	path_to_save = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ str(dirName) +'/' + str(idNum) +'.png'
	path_to_save_ev = '../../distribution/imcg-waifu-girl-images/scraped-images/' + str(dirName) + '/' + str(idNum) +'_ev.png'


	response = requests.get(img_url)
	img = Image.open(BytesIO(response.content))
	img.save(path_to_save)
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
		img.close()

	# Below, we insert some code to extract quotes and audio clips




x_str = str(101)

temp_str = 'https://starlight.kirara.ca/api/v1/char_t/' + x_str
data = json.load(urllib2.urlopen(temp_str))

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

if int(evolveId) == 0:
	# That means there is no evolution form
	PILRetrieveImage(imageURL, x_str, dirName.lower(), 'None', 1)
	print("['" + x_str + "','" + firstName +"','no'],")
else:
	# There is evolution form
	PILRetrieveImage(imageURL, x_str, dirName.lower(), evolveId, 3)
	print("['" + x_str + "','" + firstName +"','no'],")
	print("['" + x_str + "','" + firstName +"','yes'],")


