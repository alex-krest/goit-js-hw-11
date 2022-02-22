import * as _ from 'lodash';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import cardItem from './templates/card.html';
// --ПЕРЕМЕННЫЕ(ССЫЛКИ НА ЭЛЕМЕНТЫ):
const DEBOUNCE_DELAY = 300;
const refs={
	formEl: document.querySelector('#search-form'),
   submitEl: document.querySelector('form>button'),
	containerOfCards:document.querySelector('.gallery'),
  buttonMoreEl:document.querySelector('.load-more'),
}

console.log(refs.formEl);
console.log(refs.submitEl);
console.log(refs.containerOfCards);
console.log(refs.buttonMoreEl);

// -КНОПКА НЕ ВИДИМАЯ:
// refs.buttonMoreEl.style.visibility='hidden';

// ---ФУНКЦИЯ ВЫПОЛНЕНИЯ ЗАПРОСА:
// --переменные для функции:
const URL='https=//pixabay.com/api'
const API_KEY='25825735-8b8da9ef48536d11ea73b8299';
// ,-к-во элементов на странице:
let page=1;
// -к-во страниц в запросе:
let per_page=40;
const fetchPhoto=(nameReguest)=>{
	// обьект параметров для запроса по странице и к-ву элементов:
	const params=new URLSearchParams({
		per_page:per_page,
		page:page,
	})
return fetch(`${URL}/?key=${API_KEY}/&g=${nameReguest}&image_type=photo&orientation=horizontal&safesearch=true&${params}`)
.then(
	(response) => {
	  if (!response.ok) {
		 throw new Error(response.status);
	  }
	  console.log(response.json());
	  return response.json();
	}
 );
}
// --ФУНКЦИЯ ОБРАБОТКИ ЗАПРОСА(колбек для INPUT):
const onSearchPhoto=(e)=>{
	e.preventDefault();
	const{
		elements:{searchQuery}}=e.currentTarget;
		const nameReguest=searchQuery.value;
	console.log(nameReguest);
fetchPhoto(nameReguest)
.then(onThen)
.catch(onCatch)
}
// -ФУНКЦИЯ ДЛЯ THENa:
const onThen=(arrayPhoto)=>{
	page+=1;
	// -если массив пустой:
	if(arrayPhoto===[]){
return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
}
// -рендерим разметку :
renderOfCard(arrayPhoto);
}

// -ФУНКЦИЯ ДЛЯ CATCHa:
const onCatch=(error)=>{
	Notiflix.Notify.warning(error);
}
// -ФУНКЦИЯ СОЗДАНИЯ РАЗМЕТКИ:
const renderOfCard=(arrayPhoto)=>{
const markup=arrayPhoto.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads })=>{
	markup=` <div class="photo-card">
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
})
refs.containerOfCards.innerHTML=markup;
}
// -ФУНКЦИЯ SUBMIT:
refs.formEl.addEventListener('submit', onSearchPhoto)