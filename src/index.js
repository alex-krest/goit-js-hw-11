import * as _ from 'lodash';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import ApiService from './api-service'
// --ПЕРЕМЕННЫЕ(ССЫЛКИ НА ЭЛЕМЕНТЫ):
const DEBOUNCE_DELAY = 300;
const refs={
	formEl: document.querySelector('#search-form'),
   submitEl: document.querySelector('form>button'),
	containerOfCards:document.querySelector('.gallery'),
  buttonMoreEl:document.querySelector('.load-more'),
}
// -СОЗДАЕМ ЭКЗЕМПЛЯР КЛАССА:
const photoApiService=new ApiService();


// -КНОПКА НЕ ВИДИМАЯ:
// refs.buttonMoreEl.style.visibility='hidden';

// -ФУНКЦИЯ СОЗДАНИЯ РАЗМЕТКИ:
const renderOfCard=(arrayPhoto)=>{
const markup=arrayPhoto.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads })=>{
	return ` <div class="photo-card">
	<img src="${webformatURL}" alt="${tags}" loading="lazy" />
	<div class="info">
	  <p class="info-item">
		 <b>${likes}</b>
	  </p>
	  <p class="info-item">
		 <b>${views}</b>
	  </p>
	  <p class="info-item">
		<b>${comments}</b>
	  </p>
	  <p class="info-item">
		 <b>${downloads}</b>
	  </p>
	</div>
 </div> `
}).join('');
console.log(markup);
refs.containerOfCards.innerHTML=markup;
}
// -ФУНКЦИЯ ДЛЯ THENa:
const onThen=(arrayPhoto)=>{
	// -если массив пустой:
	if(arrayPhoto===[]){
return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
}
photoApiService.page+=1;
 console.log(photoApiService.page);
// -рендерим разметку :
 return renderOfCard(arrayPhoto);

}

// -ФУНКЦИЯ ДЛЯ CATCHa:
const onCatch=(error)=>{
	Notiflix.Notify.warning(error);
}

// --ФУНКЦИЯ ОБРАБОТКИ ЗАПРОСА(колбек для INPUT):
const onSearchPhoto=(e)=>{
	e.preventDefault();
	photoApiService.query=e.currentTarget.elements.searchQuery.value;
	console.log(photoApiService.fetchPhoto());
	// ПРИХОДИТ НЕ МАССИВ!!!!!ПОЧЕМУ????????:
 photoApiService.fetchPhoto()
.then(onThen)
.catch(onCatch)
}

// -ФУНКЦИЯ SUBMIT:
refs.formEl.addEventListener('submit', onSearchPhoto)


// --ФУНКЦИЯ ЗАГРУЗИТЬ БОЛЬШЕ:
function onLoadMore(){
	photoApiService.fetchPhoto()
	.then(onThen)
	.catch(onCatch)
	}

	refs.buttonMoreEl.addEventListener('click',onLoadMore);