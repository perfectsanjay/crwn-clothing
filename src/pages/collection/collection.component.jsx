import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item-component';
import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = () => {
  const { collectionId } = useParams(); // Get the collectionId from the route parameters
  const collection = useSelector((state) =>
    selectCollection(collectionId)(state)
  ); // Use Redux selector to get the collection

  if (!collection) {
    return <div>Collection not found</div>;
  }

  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} /> 
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
