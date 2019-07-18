class Game {
  constructor (users) {
    this.users = users;
    this.winningRots = {};
    this.gameOver = true;
    this.timerLength = 30;
    this.intermissionTime = 10;
    this.timerStartedAt = null;
    this.lastWinner = "no one...";
    this.initGame();
  }
  gameData() {
    return (this.gameOver ? {messageType: "gameData", isGameRunning: false, lastWinner: this.lastWinner, winningRots: this.winningRots} : {messageType: "gameData", isGameRunning: true, lastWinner: this.lastWinner, winningRots: this.winningRots, timeLeft: this.getTimeLeft()})
  }
  initGame() {
    this.winningRots = this.pickWinningRotations();
    this.gameOver = false;
    this.timer().then(()=>{
      this.blastChannels(this.gameData());
      this.intermissionTimeout = setTimeout(()=>{
        this.initGame();
      },this.intermissionTime*1000);
    })
    this.blastChannels(this.gameData());
  }
  registerUser(user) {
    this.users.addUser(user);
    this.sendInitialState(user);
  }
  unregisterUser(user) {
    this.users.removeUser(user);
  }
  sendInitialState(user) {
      user.send(JSON.stringify(this.gameData()));
  }
  pickWinningRotations() {
    return {x: this.randAngle(), y: this.randAngle(), z: this.randAngle()}
  }
  randAngle() {
    let min = Math.ceil(0);
    let max = Math.floor(359);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getTimeLeft() {
    let timeDelta = ((this.timerLength*1000) - (new Date() - this.timerStartedAt)) 
    if ( timeDelta > 0 && !this.gameOver) {
      return timeDelta
    }
    else {
      return 0
    }
  }
  timer() {
    this.timerStartedAt = new Date();
    return new Promise((resolve, reject) => {
      this.gameTimeout = setTimeout(() => {
        this.gameOver = true 
        resolve();  
      }, this.timerLength * 1000);
    })
  }
  puzzleSolved(user) {
    clearTimeout(this.gameTimeout);
    this.gameOver = true;
    this.lastWinner = user.username;
    this.blastChannels(this.gameData());
    this.gameWonTimeout = setTimeout(()=> {
      this.initGame();
    },this.intermissionTime*1000);
  }
  blastChannels(messageObj) {
    this.users.all().forEach(user=>{
      user.send(JSON.stringify(messageObj));
    })
  }
}

module.exports = { Game };
