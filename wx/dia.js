module.exports = function (domain) {

  domain.open = function(key, props) {
      this.setState({
        [`${key}`]: true,
        props
      });
  };

  domain.close = function(key, callback) {
      this.setState({
          [`${key}`]: false,
      });

      if(callback){
          callback.call(this);
      }
  };

}