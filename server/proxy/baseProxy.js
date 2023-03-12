const BaseProxy = {
  errorHandling: function (error) {
    if (error.response) {
      let { status } = error.response;
      if (status !== 400) {
        console.log(error);
      }
    }
  }
};
module.exports = BaseProxy;
