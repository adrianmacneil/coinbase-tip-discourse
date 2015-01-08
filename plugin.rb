# name: coinbase tip
# about: add a button at the end of every post allowing users to tip the author
# version: 0.1
# authors: Coinbase

register_asset "javascripts/initializers/coinbase-tip.js.es6"

after_initialize do
  load File.expand_path("../controllers/coinbase_controller.rb", __FILE__)

  Discourse::Application.routes.prepend do
    get 'coinbase/get_tip_id' => 'coinbase#get_tip_id'
  end
end

register_css <<CSS

.topic-body {
  z-index: auto;
}

.cb-tip-button {
  margin-right: auto;
  display: inline-block;
  text-align: left;
  padding-top: 8px;
  z-index: 1;
  position: relative;
}

CSS
