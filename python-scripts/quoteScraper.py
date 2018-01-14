import json
import urllib
import urllib2
import requests
from io import BytesIO
from PIL import Image

from bs4 import BeautifulSoup
import os
import re

def audioExists(cardID):
	# Check to see if the card has sound or not
	cardID = str(cardID)


	urlRead = 'https://starlight.kirara.ca/card/'+cardID
	r = urllib.urlopen(urlRead).read()
	soup = BeautifulSoup(r,"html.parser")
	body = soup.find('body')

	results = body.find_all(href=re.compile('\.mp3$'), recursive=True)


	if len(results) > 0:
		return True

	return False	

def dirExistCheck(fullName, charID, cardID, cardIDEv, hasAudio):


	hasAudioPath = 'no-audio'

        if hasAudio:
                hasAudioPath = 'audio'

	# Preforming checks to see if directory exists
	namePath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'
	if not os.path.exists(namePath):
		commandMake = 'mkdir ' + namePath
		os.system(commandMake)

	charIDPath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'
	
	if not os.path.exists(charIDPath):
		commandMake = 'mkdir ' + charIDPath
		os.system(commandMake)
	
	cardIDPath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardID+'/'
	if not os.path.exists(cardIDPath):
		commandMake = 'mkdir ' + cardIDPath
		commandMakeHome = 'mkdir ' + cardIDPath + 'home/'
		commandMakeAudio = 'mkdir ' + cardIDPath + 'home/audio/'

		os.system(commandMake)
		os.system(commandMakeHome)
		if hasAudio:
			os.system(commandMakeAudio)


	cardIDEvPath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardIDEv+'/'
	if not os.path.exists(cardIDEvPath):
		commandMake = 'mkdir ' + cardIDEvPath
		commandMakeHome = 'mkdir ' + cardIDEvPath + 'home/'
		commandMakeAudio = 'mkdir ' + cardIDEvPath + 'home/audio/'
		
		os.system(commandMake)
		os.system(commandMakeHome)
		if hasAudio:
			os.system(commandMakeAudio)



def extractQuotes(fullName, charID, cardID, cardIDEv, hasAudio, fromPoster):

	cardID = str(cardID)
	charID = str(charID)
	cardIDEv = str(cardIDEv)

	urlRead = 'https://starlight.kirara.ca/card/'+cardID
	
	r = urllib.urlopen(urlRead).read()
	soup = BeautifulSoup(r,"lxml")
	body = soup.find('body')

	searchID = 'va_card_' + cardID

	#table = soup.find('table', id="va_card_100001")
	table = soup.find('table', id=searchID)
	
	if table is None:
		cardIDEv = str(int(cardID))
		cardID = str(int(cardID) - 1)	
		searchID = 'va_card_' + cardID
		table = soup.find('table', id=searchID)

	# Make directories if they don't exist
	dirExistCheck(fullName, charID, cardID, cardIDEv, hasAudio)
        
	hasAudioPath = 'no-audio'

        if hasAudio:
                hasAudioPath = 'audio'

	if not fromPoster:
		savePath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardID+'/home/quote.txt'
		savePathEv = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardIDEv+'/home/quote.txt'


		downloadPath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardID+'/home/audio/'
		downloadPathEv = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardIDEv+'/home/audio/'
	else:
		# If it is a poster
		savePath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardIDEv+'/home/quote.txt'
		savePathEv = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardID+'/home/quote.txt'


		downloadPath = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardIDEv+'/home/audio/'
		downloadPathEv = '../../distribution/imcg-waifu-sim-quotes/'+hasAudioPath+'/'+fullName+'/'+charID+'/'+cardID+'/home/audio/'


	quoteFile = open(savePath, 'w')

	splitCounter = 0
	stageNum = 0
	enteredFirst = False
	occ_count = -1

	if table is None:
		print(cardID)

	for row in table.findAll('tr'):
		
	
		td = row.findAll('td')

		#print '-----------'

		if splitCounter >= 3 and enteredFirst:
			enteredFirst = False
			stageNum = stageNum + 1
			occ_count = -1

			# Switch to new file
			quoteFile.close()

			if stageNum < 2:
				quoteFile = open(savePathEv, 'w')

				#print('Entering Stage: ' + str(stageNum))

		notTarget = False

		correctSound = False


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
						splitCounter = splitCounter + 1
						notTarget = True
						correctSound = False
						break
					else:
						# This is the home screen
						#print('['+span.text+']')
						splitCounter = 0
						notTarget = False
						enteredFirst = True
						correctSound = True
			
				elif spanCounter <= 1 and not notTarget:
					# It probably is the Japanese quote
					#print(span.text)

					quoteStr = span.text.encode('utf8') + '\n'
					quoteFile.write(quoteStr)
					splitCounter = 0
					occ_count = occ_count + 1
					#print('')
					break

				spanCounter = spanCounter + 1

			aAR = col.findAll('a')

			for a in aAR:
				if correctSound:
					#print a['href']
			
					if stageNum < 1:
						dlPath = downloadPath + str(occ_count) + '.mp3'
					else:
						dlPath = downloadPathEv + str(occ_count)+ '.mp3'
					urllib.urlretrieve(a['href'],dlPath)		

					correctSound = False

def spriteExtract(dirName, charID, cardID, cardIDEv, hasAudio):
	# Extract sprites
	charID = str(charID)

	urlRead = 'https://starlight.kirara.ca/char/'+charID
	r = urllib.urlopen(urlRead).read()
	soup = BeautifulSoup(r,"html.parser")
	body = soup.find('body')

	divAr = body.findAll('div')
	
	for div in divAr:
		hasAudioPath = 'no-audio'
		if hasAudio:
			hasAudioPath = 'audio'

		if div['class'][0] == 'hang_inside':
		
			aAr = div.findAll('a')
			
			for a in aAr:
				# To get the cardID
				if a.text == 'Petit sprite':
					cardID = a['href'].split('/')[-1].split('.')[0]

			for a in aAr:
				if a.text == 'View sprite':
					# Going to save the transparent images
					normURL = a['href']
	
					digit = int(normURL.split('/')[-1].split('.')[0])
					evURL = 'https://truecolor.kirara.ca/chara2/'+str(charID)+'/' + str(digit+1)+'.png'	
			

					path_to_save = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ hasAudioPath + '/' +str(dirName) +'/' + str(cardID) +'.png'
					path_to_save_ev = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ hasAudioPath + '/' +str(dirName) +'/' + str(cardID) +'_ev.png'
					response = requests.get(normURL)

					if response.status_code == 404:
						continue

					img = Image.open(BytesIO(response.content))
					img.save(path_to_save)
					img.close()

					response = requests.get(evURL)

					if response.status_code == 404:
						continue

					img = Image.open(BytesIO(response.content))
					img.save(path_to_save_ev)
					img.close()

					'''
					print(normURL)
					print(evURL)
					print('')
					'''



def printSubCards(dirName, charID, cardID, cardIDEv, hasAudio):


	# Extract sprites
	charID = str(charID)

	urlRead = 'https://starlight.kirara.ca/char/'+charID
	r = urllib.urlopen(urlRead).read()
	soup = BeautifulSoup(r,"html.parser")
	body = soup.find('body')

	divAr = body.findAll('div')
	
	for div in divAr:
		hasAudioPath = 'no-audio'
		if hasAudio:
			hasAudioPath = 'audio'

		if div['class'][0] == 'hang_inside':
		
			aAr = div.findAll('a')
			
			for a in aAr:
				# To get the cardID
				if a.text == 'Petit sprite':
					cardID = a['href'].split('/')[-1].split('.')[0]
					
					print("['" + charID + "','"+ str(int(cardID)+1) +"','" + dirName.lower() +"','no','sub'],")
					print("['" + charID + "','"+ cardID+"','" + dirName.lower() +"','yes','sub'],")



def posterExtract(dirName, charID, cardID, cardIDEv, hasAudio):

	# Check to see if the card has sound or not
	charID = str(charID)


	urlRead = 'https://starlight.kirara.ca/char/'+charID
	r = urllib.urlopen(urlRead).read()
	soup = BeautifulSoup(r,"html.parser")
	body = soup.find('body')

	divAr = body.findAll('div')
	

	for div in divAr:

		hasAudioPath = 'no-audio'
		if hasAudio:
			hasAudioPath = 'audio'


		if div['class'][0] == 'spread_view':
			# evolution forms


			if hasAudio:
				path_to_save

			urlImg = div['style']
			extractURL = urlImg[urlImg.find("(")+1:urlImg.find(")")]
			cardID = extractURL[-10:-4]


			path_to_save_ev = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ hasAudioPath + '/' +str(dirName) +'/' + str(cardID) +'_pev.png'

			response = requests.get(extractURL)

			if response.status_code == 404:
				continue

			img = Image.open(BytesIO(response.content))
			img.save(path_to_save_ev)
			img.close()


			if hasAudio:

                        	print("['" + charID + "','"+ cardID+"','" + dirName.lower() +"','yes','sub'],")


				extractQuotes(dirName, charID, cardID, cardIDEv, hasAudio, True)


		if div['class'][0] == 'carcon':		
			# normal forms

			picURL = 'https://truecolor.kirara.ca/spread/' + div['data-chain'].split()[1] + '.png'
			cardID = div['data-chain'].split()[1][-10:]
	
			path_to_save = '../../distribution/imcg-waifu-girl-images/scraped-images/'+ hasAudioPath + '/' +str(dirName) +'/' + str(cardID) +'_p.png'
			response = requests.get(picURL)

			if response.status_code == 404:
				continue

			img = Image.open(BytesIO(response.content))
			img.save(path_to_save)
			img.close()


			if hasAudio:
				print("['" + charID + "','"+ cardID+"','" + dirName.lower() +"','no','sub'],")
				extractQuotes(dirName, charID, cardID, cardIDEv, hasAudio, True)



