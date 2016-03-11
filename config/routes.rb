Rails.application.routes.draw do
  root 'tasks#index'
  resources :tasks

  namespace :api, format: 'json' do
    resources :tasks
  end
end
