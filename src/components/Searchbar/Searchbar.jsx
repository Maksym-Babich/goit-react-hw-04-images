import { useState } from 'react';
import { fetchImages } from '../../api/api';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import {
  Header,
  Form,
  SearchButton,
  SearchButtonLabel,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export function SearchBar({ onNewQuerrySend }) {
  const [querry, setQuerry] = useState('');

  const onInputChange = event => {
    setQuerry(event.target.value);
  };

  const onFormSubmit = async event => {
    event.preventDefault();
    const newQuerry = querry.trim();
    if (newQuerry === '') {
      Notiflix.Notify.failure('Your querry can not be empty');
      return;
    }

    try {
      const data = await fetchImages(newQuerry, 1);
      if (data.hits.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      onNewQuerrySend(data.hits, newQuerry, data.totalHits);
      setQuerry('');
      Notiflix.Notify.success(`Seccess, we found ${data.totalHits} images`);
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Something went wrong, please, reload the page');
    }
  };

  return (
    <Header>
      <Form onSubmit={onFormSubmit}>
        <SearchButton type="submit">
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>
        <Input
          onChange={onInputChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={querry}
        />
      </Form>
    </Header>
  );
}

SearchBar.propTypes = {
  onNewQuerrySend: PropTypes.func.isRequired,
};
