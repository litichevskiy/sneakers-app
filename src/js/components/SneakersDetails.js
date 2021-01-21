import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from './Image';
import { STORE_NAMES } from '../constants';

const SneakersDetails = () => {

  const product = useSelector( state => state.sneakers.selectedProduct );
  const dispatch = useDispatch();

  if( !product ) return null;

  const { name, imgUrl, story, sku, brand, gender, colorway, releaseDate, price, links } = product;

  const closeDetails = () => dispatch({type: 'SET_SELECTED_PRODUCT', payload: null });

  const listLinks = getArrayLinks( links );
  const stores = getStoreNames( listLinks );

  return(
    <section className="sneakers-detail" style={{width: '500px', background: 'aliceblue'}}>
      <span onClick={closeDetails} >close</span>
      <h5>{name}</h5>
      <div>
        <Image alt={name} src={imgUrl} style={{width: '200px', border: '1px solid grey'}} />
        <p>{story}</p>
      </div>
      <div>
        <div><span style={{color: "brown"}}>sku:</span> {sku}</div>
        <div><span style={{color: "brown"}}>brand:</span> {brand}</div>
        <div><span style={{color: "brown"}}>gender:</span> {gender}</div>
        <div><span style={{color: "brown"}}>colorway:</span> {colorway}</div>
        <div><span style={{color: "brown"}}>releaseDate:</span> {releaseDate}</div>
        <div><span style={{color: "brown"}}>price:</span> ${releaseDate}</div>
        <div>
          {stores.map(( [app, link] ) =>
            <a key={app} target="_blank" href={link} style={{margin: '0.5rem'}}>{app}</a>)
          }
        </div>
      </div>
    </section>
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