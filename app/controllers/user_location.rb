require 'json'

BallinOctoAdventure::App.controllers :user_location do

  get :index, :provides => [:json] do
    UserLocation.where(:device => params[:device]).last(10).to_json
  end
  
  post :create, :csrf_protection => false, :provides => [:json] do
    json = JSON.parse(request.body.string)
    @user_location = create_user_location(json, request)
    if @user_location && @user_location.persisted?
      @user_location.to_json
    else
      @user_location.errors.to_json
    end
  end
  
  get :map do
    @devices = UserLocation.select(:device).uniq.map(&:device) + ['none']
    render 'map'
  end
  
  # get :index, :map => '/foo/bar' do
  #   # session[:foo] = 'bar'
  #   render 'index'
  # end

  # get :sample, :map => '/sample/url', :provides => [:any, :js] do
  #   case content_type
  #     when :js then ...
  #     else ...
  # end

  # get :foo, :with => :id do
  #   'Maps to url '/foo/#{params[:id]}''
  # end

  # get '/example' do
  #   'Hello world!'
  # end
  

end