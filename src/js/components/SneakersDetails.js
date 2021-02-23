import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from './Image';
import Dialog from './Dialog';
import Button from './Button';
import { Tabs, Tab } from './Tabs';
import { STORE_NAMES } from '../constants';
import formatDate from '../utils/formatDate';

const SneakersDetails = () => {

  const product = useSelector( state => state.sneakers.selectedProduct );
  const dispatch = useDispatch();

  if( !product ) return null;

  const { name, imgUrl, story, sku, brand, gender, colorway, releaseDate, retailPrice, links, imgColors } = product;

  const closeDetails = () => dispatch({type: 'SET_SELECTED_PRODUCT', payload: null });

  const listLinks = getArrayLinks( links );
  const stores = getStoreNames( listLinks );

  const { year, month, day, fullDateISO } = formatDate( new Date(releaseDate) );
  const selectedItem = document.querySelector(`[data-id="${sku}"]`);

  return(
    <Dialog closeDialog={closeDetails} selectedItem={selectedItem} >
      <section className="sneakers-detail">
        <Button clickHandler={closeDetails} className="empty-btn empty-btn__close close" aria-label="close" />
        <h3 className="header">{name}</h3>
        <div className="detail-content">
          <div className="detail-image-container">
          <Image alt={name} src={imgUrl} className="detail-image" />
          </div>
          <Tabs index={0}>
            <Tab label="details">
              <ul className="details-list">
                <li className="details-list-item">
                  <span className="title">brand</span>
                  {brand}
                </li>
                <li className="details-list-item">
                  <span className="title">gender</span>
                  {gender}
                </li>
                <li className="details-list-item">
                  <span className="title">colorway</span>
                  {colorway}
                </li>
                <li className="details-list-item">
                  <span className="title">release date</span>
                  <time className="time" dateTime={fullDateISO}>{day}  {month}  {year}</time>
                </li>
                <li className="details-list-item">
                  <span className="title">sku</span>
                  {sku}
                </li>
                <li className="details-list-item">
                  <span className="title">price</span>
                  ${retailPrice}
                </li>
              </ul>
            </Tab>
            <Tab label="about">
              <p className="story">{story || `description isn't available`}</p>
            </Tab>
          </Tabs>
        </div>
        <h5 className="header header--small">available in stock</h5>
        <div>
          {stores.map(( [app, link] ) =>
            <a key={app} target="_blank" href={link} className="link link__external">
              {app}
            </a>
          )}
        </div>
      </section>
    </Dialog>
  )
};

const getArrayLinks = ( string ) => string.replace(/[\[\]]/g,'').split(', ');

const getStoreNames = ( links ) => {
  return links.reduce(( combine, link ) => {
    const hostname = new URL( link ).hostname.split('.')[0];
    const key = STORE_NAMES[hostname] || hostname;
    return [...combine, [ key, link ] ];
  },[]);
};

export default SneakersDetails;