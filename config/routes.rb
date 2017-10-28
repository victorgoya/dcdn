Rails.application.routes.draw do
  root to: "home#index"
  get '/s3/sign', to: "s3#sign"

  namespace :api do
    resources :contents
  end
end
