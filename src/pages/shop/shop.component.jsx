import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';


import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { collection, onSnapshot,getFirestore,getDocs  } from 'firebase/firestore';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, 'collections');
  
    // One-time fetch
    getDocs(collectionRef).then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false }); 
    });
  }
  
  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={<CollectionsOverviewWithSpinner isLoading={loading} />}
          />
          <Route
            path=":collectionId"
            element={<CollectionPageWithSpinner isLoading={loading} />}
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
