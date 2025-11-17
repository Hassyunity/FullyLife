Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :objectifs
      resources :routines do
        resources :routine_items, only: [:create, :update, :destroy]
      end
      resources :suivis, only: [:index, :show, :update]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
