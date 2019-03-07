class TreasuresController < ApplicationController

  def index
    @treasures = Treasure.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @treasures}
    end
  end

  def show
    treasure
    theory
    @theories = Theory.all
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @treasure.to_json(only: [:id, :name, :description], include: [theory: {only: [:id, :name, :description, :issues, :success, :prove_date]}])}
    end
  end

  def new
    @treasure = Treasure.new
    @treasure.theories.build
  end
  def create
    @treasure = Treasure.new(treasure_params)
    @treasure.user_id = current_user.id
    if @treasure.save
      redirect_to @treasure, notice: "Treasure was successfully saved"
    else
      render :new
    end
  end

  def edit
    treasure
  end
  def update
    treasure
    if treasure.update(treasure_params)
      redirect_to treasure_path, notice: "Treasure was successfully updated"
    else
      render :edit
    end
  end

  def destroy
    treasure.destroy
    redirect_to treasures_url, notice: "Treasure was successfully destroyed"
  end

  private

  def treasure
    @treasure = Treasure.find_by(id: params[:id])
  end

  def theory
    @theory = Theory.find_by(id: params[:id])
  end

  def treasure_params
    params.require(:treasure).permit(:name, :description,
      theories_attributes: [:name, :description, :issues, :success, :prove_date, :treasure_id, :user_id]
    )
  end
end
