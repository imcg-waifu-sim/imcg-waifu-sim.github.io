import json
import urllib
import urllib2

from PIL import Image
import requests
from io import BytesIO

temp_str = 'https://starlight.kirara.ca/api/v1/char_t/101'
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

print(cardURL)


