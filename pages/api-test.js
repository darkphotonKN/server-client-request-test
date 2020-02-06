import fetch from 'isomorphic-fetch';

export default class ApiTest extends React.Component {
  static async getInitialProps() {
    let apiDataResponse = [];
    let apiDataJson = [];
    let callLocation = '';

    // server side
    if (typeof window === 'undefined') {
      apiDataResponse = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      apiDataJson = await apiDataResponse.json();
      callLocation = 'Server Side';
    }
    // client side
    else {
      apiDataResponse = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      );
      apiDataJson = await apiDataResponse.json();
      callLocation = 'Client Side';
    }

    return {
      apiDataJson,
      callLocation
    };
  }

  render() {
    const { callLocation, apiDataJson } = this.props;
    return (
      <div>
        <h2>{callLocation ? callLocation : 'No response yet'}</h2>
        <div>
          <p>Data:</p>
          {apiDataJson ? apiDataJson.map((data) => <p>{data.name}</p>) : null}
        </div>
      </div>
    );
  }
}
