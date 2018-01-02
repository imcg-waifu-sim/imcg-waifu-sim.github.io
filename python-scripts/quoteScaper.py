import json
import urllib
import urllib2
import requests
from io import BytesIO

from bs4 import BeautifulSoup

savePath = '../../distribution/imcg-waifu-sim-quotes/uzuki/001/home/quote.txt'

urlRead = 'https://starlight.kirara.ca/card/100002'
r = urllib.urlopen(urlRead).read()
soup = BeautifulSoup(r,"lxml")
body = soup.find('body')
table = soup.find('table', id="va_card_100001")

quoteFile = open(savePath, 'w')

for row in table.findAll('tr'):
	
	td = row.findAll('td')

	print '-----------'


	notTarget = False

	for col in td:
		spanAr = col.findAll('span')


		spanCounter = 0
		for span in spanAr:
			# We have finally entered the columns containing the sound tracks
			# Now we have to filter for the right clips
			if span.text[0:12] == 'USE_TYPE__T_':

				if int(span.text[12]) != 1:
					# This means this isn't the home screen
					#print('XXX['+span.text+']XXX')
					notTarget = True
					break
				else:
					print('['+span.text+']')
					notTarget = False
			elif spanCounter <= 1 and not notTarget:
				# It probably is the Japanese quote
				print(span.text)

				quoteStr = span.text.encode('utf8') + '\n'
				quoteFile.write(quoteStr)
				print('')
				break

			spanCounter = spanCounter + 1

quoteFile.close()
	#print(td[0].findAll('span'))
	#print ''
#print(row)
