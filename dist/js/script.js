					
let img = 'img/picture.png';
let rows = document.querySelectorAll('.row');
let wrapper = document.querySelector('#wrapper');
let feedback = wrapper.querySelector('#feedback');
let popup = wrapper.querySelector('#popup');
let links = wrapper.querySelectorAll('a');
let closePopup = wrapper.querySelector('[src="img/cross_for_buttonClose.png"]');
let shutter = wrapper.querySelector('#shutter');
let bindInputs = wrapper.querySelectorAll('[class="binding"]'); // инпуты обяязательные для заполнения
let submit = wrapper.querySelector('#submit');

let aside = wrapper.querySelector('aside');
let mainUlAsade = aside.querySelector('ul');
let outerLiAside = aside.querySelectorAll('.outer'); // li, содержищие внутренний ul
let isideLinks = aside.querySelectorAll('a');
addDataset(outerLiAside);
addDataset(aside.querySelectorAll('.innerList'));

let arrowLeft = wrapper.querySelector('[src="img/left_arrow.jpg"]');
let arrowRight = wrapper.querySelector('[src="img/right_arrow.jpg"]');
let pictures = wrapper.querySelectorAll('[id^="picture"]'); // два слайдера
console.log(pictures);
let slider = wrapper.querySelector('#slider'); // див, содержащий слайдером

		function loadImage(path){
					  return new Promise((resolve, reject) => {
					    let img = new Image();
						img.src = path;
						
						img.onload = () => resolve(img);
						img.onerror = () => reject(error);
					  });
					}
					
				  for(let i = 0; i < 3; i++){ 	
					let loadedImage = loadImage(img).then(
					  res => {						
							 rows[0].appendChild(res)
						  }
					  
					).catch(
					 error => rows[0].innerHTML = 'error image'
					)
					}
					
						  for(let i = 0; i < 2; i++){ 	
					let loadedImage = loadImage(img).then(
					  res => {						
							 rows[1].appendChild(res)
						  }
					  
					).catch(
					 error => rows[1].innerHTML = 'error image'
					)
					}	

for(let input of bindInputs){
	input.addEventListener('blur', function(){
		if(this.value == ''){
			this.style.background = 'url(img/empty_input.png)';
			this.placeholder = 'Поле обязательно для заполнения';
		}if(this.value != ''){
			this.style.background ='';
		}
	});
	
	input.addEventListener('focus', function(){
		if(this.value == ''){
			this.style.background = 'url(img/empty_input.png)';
			this.placeholder = 'Поле обязательно для заполнения';
		}if(this.value != ''){
			this.style.background ='';
		}
	});
}

for(let li of outerLiAside){
	li.addEventListener('click', function(){
	deactivateElem(elemForActivation(mainUlAsade)); //for li
	deactivateElem(findActiveInnerUl(mainUlAsade)); // for ul
	
	 activateElem(this);
	 let ulForactivation = getUl(this.dataset.num, this);
	 activateElem(ulForactivation);		
	});
}	

function activateElem(elem){
	elem.classList.add('active');
}

function deactivateElem(elem){
	elem.classList.remove('active');
}

function elemForActivation(selector){
	return selector.querySelector('.active');
}

function findActiveInnerUl(ul){
  return ul.querySelector('.innerList.active');
}

function getUl(num, parent){	
	return parent.querySelector('[data-num="'+num+'"]');
}

window.timerSlider1 =  window.setInterval(goSlider1, 1000);

function goSlider1(){
	$('#picture1').fadeOut(4000);
	$('#picture2').fadeIn(10000);
	$('#picture2').fadeOut(4000);
	$('#picture1').fadeIn(10000);
}

feedback.addEventListener('click', function(e){
	$('#popup').fadeIn(1500);
	$('#shutter').fadeIn(1500);
	
	if(e.target.tagName == 'A'){	
	    popup.classList.remove('hidden');
		shutter.classList.remove('hidden');
		
		popup.classList.add('visible', 'block');
		shutter.classList.add('block');
	}
});

for(let i = 0; i < isideLinks.length; i++){   // отменяет скачок страницы при кликина ссылку в aside  			  
	isideLinks[i].addEventListener('click', function(e){
		e.preventDefault();
	});		
	isideLinks[i].addEventListener('click', getActiveLi);
}

function getActiveLi(e){   // подчеркивает ссылки при нажатии
	for(let j = 0; j < isideLinks.length; j++){
        isideLinks[j].classList.remove('underline');
	}
	 this.classList.add('underline');
}

arrowLeft.addEventListener('click', function(){
	[pictures[0].src, pictures[1].src] = [pictures[1].src, pictures[0].src];
});

arrowRight.addEventListener('click', function(){
	[pictures[1].src, pictures[0].src] = [pictures[0].src, pictures[1].src];
});

closePopup.addEventListener('click', function(e){

	 popup.classList.remove('visible', 'block');
	 shutter.classList.remove('block');
		
	 popup.classList.add('hidden');
	 shutter.classList.add('hidden');
	 
	$('#popup').fadeOut(1);
	$('#shutter').fadeOut(1);
});

submit.addEventListener('mousemove', function(){  // курсор в значение pointer для кнопки в форме
	this.style.cursor = 'pointer';
});

arrowLeft.addEventListener('mousemove', function(){  // курсор в значение pointer для кнопки в форме
	this.style.cursor = 'pointer';
});

arrowRight.addEventListener('mousemove', function(){  // курсор в значение pointer для кнопки в форме
	this.style.cursor = 'pointer';
});

function addDataset(arr){
	for(let i = 0; i< arr.length; i++){
	   arr[i].dataset.num = i;
	}
}	