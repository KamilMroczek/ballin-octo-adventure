require 'json'

BallinOctoAdventure::App.controllers :user_location do

  get :index, :provides => [:json] do
    Time.zone = 'Pacific Time (US & Canada)'
    start_time = Time.zone.parse(params[:day]).in_time_zone("Pacific Time (US & Canada)").beginning_of_day
    end_time = start_time + 1.day
    UserLocation
      .where(:device => params[:device])
      .where("created_at BETWEEN '#{start_time.utc}' and '#{end_time.utc}'")
      .last(300).to_json
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
    @devices =  ['Select'] + UserLocation.select(:device).uniq.map(&:device)
    @days = ['Select'] + last_2_weeks
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