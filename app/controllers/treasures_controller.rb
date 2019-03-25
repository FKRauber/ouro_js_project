class TreasuresController < ApplicationController
  before_action :set_treasure, only: [:show, :next, :edit, :update, :destroy]

  def index
    @treasures = Treasure.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @treasures}
    end
  end

  def show
    set_theory
    @theories = Theory.all
    respond_to do |f|
      f.html
      f.json {render json: @treasure}
    end
  end

  def next
    @next_treasure = @treasure.next
    render json: @next_treasure
  end

  def new
    @treasure = Treasure.new
    @treasure.theories.build
  end
  def create
    @treasure = Treasure.create(treasure_params)
    @treasure.user_id = current_user.id
    render json: @treasure, status: 201
  end

  def edit
  end
  def update
    if treasure.update(treasure_params)
      redirect_to treasure_path, notice: "Treasure was successfully updated"
    else
      render :edit
    end
  end

  def destroy
    @treasure.destroy
    redirect_to treasures_url, notice: "Treasure was successfully destroyed"
  end



  private

  def set_treasure
    @treasure = Treasure.find_by(id: params[:id])
  end

  def set_theory
    @theory = Theory.find_by(id: params[:id])
  end

  def treasure_params
    params.require(:treasure).permit(:name, :description,
      theories_attributes: [:name, :description, :issues, :success, :prove_date, :treasure_id, :user_id]
    )
  end
end
