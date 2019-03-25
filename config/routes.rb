Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#home"

  resources :users
  resources :treasures do
    resources :theories
  end

  get "/recent", to: "theories#recent"
  get "/treasures/:id/next", to: 'treasures#next'

  get "/auth/github/callback", to: "sessions#omniauth"
  get "/signin", to: "sessions#new"
  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"

end
