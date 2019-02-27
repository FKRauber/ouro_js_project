class SessionsController < ApplicationController
  before_action :logged_in_req, except: [:new, :create, :home, :omniauth]

  def new
    @user = User.new
    @users = User.all
  end
  def create
    @user = User.find_by(username: params[:user][:username])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user), :notice => "Signed In!"
    else
      redirect_to signin_path, :notice => "Unable to sign you in, please try again."
    end
  end

  def omniauth
    if auth_hash = request.env["omniauth.auth"]
      user = User.find_or_create_by_oa(auth_hash)
      session[:user_id] = user.id
      redirect_to root_url, :notice => "Signed In!"
    else
      redirect_to root_url, :notice => "Unable to sign you in, please try again."
    end
  end

  def destroy
  	session.clear
  	redirect_to root_url, :notice => "Logged Out"
  end

  private

  def auth
    request.env["omniauth.auth"]
  end


end
