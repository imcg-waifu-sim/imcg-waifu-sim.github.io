import json
import urllib
import urllib2

from PIL import Image
import requests
from io import BytesIO

def PILRetrieveImage(img_url, idNum,evolveId, status_num):
	# 0 = None for both non-idol & idolized
  	# 1 = Only non-idolized exist
    	# 2 = Only idolized exist
    	# 3 = Both non-idol & idolized exist


	path_to_save = '../../distribution/imcg-waifu-girl-images/scraped-images/uzuki/' + str(idNum) +'.png'
	path_to_save_ev = '../../distribution/imcg-waifu-girl-images/scraped-images/uzuki/' + str(idNum) +'_ev.png'


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

tempID = 101

temp_str = 'https://starlight.kirara.ca/api/v1/char_t/' + str(tempID)
data = json.load(urllib2.urlopen(temp_str))

japName = data['result'][0]['name']
kanaName = data['result'][0]['name_kana']

baseCardId = data['result'][0]['base_card_id']

card_url = 'https://starlight.kirara.ca/api/v1/card_t/' + str(baseCardId)
data = json.load(urllib2.urlopen(card_url))

evolveId = data['result'][0]['evolution_id']
romanName = data['result'][0]['chara']['conventional']

cardURL = data['result'][0]['card_image_ref']
imageURL = data['result'][0]['sprite_image_ref']
iconURL = data['result'][0]['icon_image_ref']

if int(evolveId) == 0:
	# That means there is no evolution form
	PILRetrieveImage(imageURL, tempID, 'None', 1)
else:
	# There is evolution form
	PILRetrieveImage(imageURL, tempID, evolveId, 3)


