function randomText(min_length,max_length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //longitudes de texto mas pequeñas son mas probables
    var random_length = Math.floor(Math.exp(Math.random() * Math.log(max_length - min_length + 1)) + min_length - 1);
  
    for (var i = 0; i < random_length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  export default randomText;