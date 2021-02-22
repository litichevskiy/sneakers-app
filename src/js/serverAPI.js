const EMPTY_URL = 'url can not be empty';

const serverAPI = {
  async fetch ( url ) {
    if ( !url ) throw new Error( EMPTY_URL );

    const response = await fetch( url )

    if( !response.ok ) {
      const error = await response.json();
      throw new Error( error.message );
    }
    else return await response.json();
  }
};

export default serverAPI;