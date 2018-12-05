import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cn from 'classnames';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Block from 'components/HomePageBlock';

import { selectPlugins } from 'containers/App/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getArticles, onChange, submit } from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

export class HomePage extends React.PureComponent {
  render() {
    return (
      <div className={cn('container-fluid', styles.containerFluid)}>
        <Helmet title="Home Page" />
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <Block>
              <h1>
                Welcome to Wavetec CMS
              </h1>
            </Block>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  plugins: selectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getArticles,
      onChange,
      submit,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

// export default connect(mapDispatchToProps)(HomePage);
export default compose(withReducer, withSaga, withConnect)(HomePage);
