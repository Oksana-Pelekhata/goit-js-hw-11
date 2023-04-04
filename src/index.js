import Notiflix from 'notiflix';
import {PixabayAPI} from './pixabayAPI'
import './css/styles.css';
// import axios from "axios";

const searchFormEl = document.querySelector('.search-form')
const loadMoreBtnEl = document.querySelector('.load-more')
const divEl = document.querySelector('.gallery')

const pixabayApi = new PixabayAPI()

loadMoreBtnEl.classList.add('is-hidden');

// const hideElement = (DOMElem, totalHits, page) => {
//     console.log(totalHits)
//     if (totalHits / 40 <= page || totalHits === 0) {
//     DOMElem.classList.add('is-hidden');
//     return;
//   }
// };

const handleSearchFormSubmit = async event => {
    event.preventDefault()

    pixabayApi.page = 1

    divEl.innerHTML = '';

    if (searchFormEl.searchQuery.value === '') {
    return;
    }
    
    pixabayApi.query = searchFormEl.searchQuery.value.trim();

    searchFormEl.searchQuery.value = '';

    loadMoreBtnEl.classList.add('is-hidden');
    
    try {
        const { data } = await pixabayApi.fetchPhotos()
        console.log(data)
        console.log(data.hits.length)

        createMarkUp(data.hits)
        noMoreResult(data.totalHits);

        if (!data.hits.length) {
            console.log('Images not found!');
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'
            );
            // hideElement(loadMoreBtnEl, data.totalHits, pixabayApi.page);
      return;
        }

        if (data.hits.length > 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMoreBtnEl.classList.remove('is-hidden');
        }
        // noMoreResult(data.totalHits);

        // hideElement(loadMoreBtnEl, data.totalHits, pixabayApi.page);

        // createMarkUp(data.hits)
        // loadMoreBtnEl.classList.remove('is-hidden');
        // noMoreResult(data.totalHits);

        
    } catch (err) {
        console.log(err)
    }
    // pixabayApi.fetchPhotos().then(
    //     data => {
    //         console.log(data);
    //         hideElement(loadMoreBtnEl, data.totalHits, pixabayApi.page);
    //         createMarkUp(data.hits)
    //         loadMoreBtnEl.classList.remove('is-hidden');
    //     })
    //     .catch(err => {console.log(err);});
}

function createMarkUp(data) {
    const markUp = data.map(
(photo) => {
        return `
<div class="photo-card">
  <img src='${photo.webformatURL}' alt='${photo.tags}' loading="lazy" />
  <div class="info">
    <p class="info-item"> ${photo.likes}
      <b>Likes</b>
    </p>
    <p class="info-item">${photo.views}
      <b>Views</b>
    </p>
    <p class="info-item">${photo.comments}
      <b>Comments</b>
    </p>
    <p class="info-item">${photo.downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>`
   })
    .join('');

  divEl.insertAdjacentHTML('beforeend', markUp); 
}

const handleLoadMoreBtnClick = async () =>  {
    pixabayApi.page += 1;
    try {
        const { data } = await pixabayApi.fetchPhotos()
        // hideElement(loadMoreBtnEl, data.totalHits, pixabayApi.page);
        createMarkUp(data.hits)
        noMoreResult(data.totalHits);
    }
    catch (err) {
        console.log(err)
}
//   pixabayApi
//     .fetchPhotos()
//     .then(data => {
//       console.log(data);

//       hideElement(loadMoreBtnEl, data.totalHits, pixabayApi.page);

//       createMarkUp(data.hits)
//     })
//     .catch(err => {
//       console.warn(err);
//     });
};

function noMoreResult(totalHits) {
  if (pixabayApi.page * pixabayApi.per_page > totalHits && totalHits !== 0) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtnEl.classList.add('is-hidden');
    return;
  }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit)
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick)