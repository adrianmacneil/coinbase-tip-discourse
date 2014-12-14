import { Button } from "discourse/views/post-menu";

export default {
  name: "coinbase-tip",

  initialize: function (container) {
    var PostMenuView = container.lookupFactory("view:post-menu");

    PostMenuView.reopen({
      buttonForTip: function (post, buffer) {
        var url = document.location.origin + "/t/"+ post.get('topic_id') + "/" + post.get('id');
        var cb_id = 'coinbase'; //effectively nobody if we can't find an ID or username

        function makeAjaxCall () {
          return Discourse.ajax("/coinbase/get_tip_id", {
            dataType: 'json',
            data: { id: post.get('user_id') },
            type: 'GET'
          });
        };

        makeAjaxCall().then(function (result) {
          cb_id = result["cb_id"];
          return new Button("tip", "Tip post", "", {
            className: "cb-tip-container",
            disabled: true,
            innerHTML:
              '<div class="cb-tip-button" data-content-location=' + url + ' data-href="//www.coinbase.com/tip_buttons/show_tip" data-to-user-id=' + cb_id + ' data-src="discourse-plugin"></div><script>!function(d,s,id) {var js,cjs=d.getElementsByTagName(s)[0],e=d.getElementById(id);if(e){return;}js=d.createElement(s);js.id=id;js.src="https://www.coinbase.com/assets/tips.js";cjs.parentNode.insertBefore(js,cjs);}(document, \'script\', \'coinbase-tips\');</script>'
            }
          );
        });
      }
    });
  } 
}; 
