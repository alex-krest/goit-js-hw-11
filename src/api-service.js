// ---КЛАСС ДЛЯ ВЫПОЛНЕНИЯ ЗАПРОСА:
export default class ApiService{
	constructor(){
		this.searchQuery='';
		this.page=1;
	}
	fetchPhoto=()=>{
		console.log(this.searchQuery);
		// --переменная для метода:
const URL=`https:/pixabay.com/api/?key=25825735-8b8da9ef48536d11ea73b8299&image_type=photo&orientation=horizontal&safesearch=true&g=${this.searchQuery}&page=${this.page}&per_page=40`
	
return fetch(URL)
.then(
	(response) => {
	  if (!response.ok) {
		 throw new Error(response.status);
	  }
	//   console.log(response);
	//   console.log(response.blob());
	//   console.log(response.json());
	  return response.json();
	}
 );
}
get query(){
	return this.searchQuery;
}
set query(newQuery){
	this.searchQuery=newQuery;
}
} 