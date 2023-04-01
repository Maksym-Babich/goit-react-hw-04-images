import { useState } from 'react';
import { Grid } from 'react-loader-spinner';
import { fetchImages } from '../api/api';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export function App() {
  const [page, setPage] = useState(2);
  const [images, setImages] = useState([]);
  const [querry, setQuerry] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalHits, settotalHits] = useState(0);

  const onNewQuerrySend = (images, querry, totalHits) => {
    setPage(2);
    setImages(images);
    setQuerry(querry);
    settotalHits(totalHits);
  };

  const onLoadMoreBtnClick = async () => {
    setLoading(true);
    const data = await fetchImages(querry, page);
    setPage(page + 1);
    setImages([...images, ...data.hits]);
    setLoading(false);
  };

  return (
    <>
      <SearchBar onNewQuerrySend={onNewQuerrySend} />
      <ImageGallery images={images} />
      {loading && (
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{ placeSelf: 'center' }}
          wrapperClass=""
          visible={true}
        />
      )}
      {totalHits > images.length && !loading && (
        <Button onClick={onLoadMoreBtnClick} />
      )}
    </>
  );
}
