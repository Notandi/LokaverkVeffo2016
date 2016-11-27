// 2. This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      const playerVars = {modestbranding: 0, autoplay: 1, showinfo: 0};
      let player;
      function onYouTubeIframeAPIReady() {
        let trailers = $('div[trailerkey]');
        console.log(trailers.length);
        let list =$('div[trailerkey]').map(function(){return $(this).attr('id');}).get();
        for (let i = 0; i < list.length; i++){
          console.log(list[i]);
          player = new YT.Player(list[i], {
            height: '1080',
            width: '1920',
            videoId: list[i],
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            },
            playerVars
          });
        }
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.stopVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      let done = false;
      function onPlayerStateChange(event) {
        // if (event.data == YT.PlayerState.PLAYING && !done) {
        //   setTimeout(stopVideo, 6000);
        //   done = true;
        // }
      }
      function stopVideo() {
        player.stopVideo();
      }
