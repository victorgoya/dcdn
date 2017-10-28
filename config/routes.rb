Rails.application.routes.draw do
  root to: "contents#index"
  get '/s3/sign', to: "s3#sign"
end
