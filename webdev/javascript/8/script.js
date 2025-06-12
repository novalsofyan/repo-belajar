function User(username, nickname, email, password) {
  this.username = username;
  this.nickname = nickname;
  this.email = email;
  this.password = password;

  //   tanpa pake arrow
  this.forgotPassword = function () {
    console.log(`Password dari ${this.username} adalah ${this.password}`);
  };

  //   kalo pake arrow
  this.forgotEmail = () => {
    console.log(`Email dari ${this.username} adalah ${this.email}`);
  };
}

ujang = new User("ujangkali", "jang", "ujangkuda@gmail.com", "ujang123");
ujang.forgotPassword();

budi = new User("budikali", "jang", "budikuda@gmail.com", "budi123");
budi.forgotPassword();
budi.forgotEmail();
