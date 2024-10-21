import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';



import CollectionPageContainer from '../collection/collection.container';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const ShopPage = ({fetchCollectionsStart}) =>  {
     useEffect(() =>{
      fetchCollectionsStart()
     },[fetchCollectionsStart])

    
      
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={<CollectionsOverviewContainer/>}
          />
          <Route
            path=":collectionId"
            element={<CollectionPageContainer />}
          />
        </Routes>
      </div>
    );
  }




const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
