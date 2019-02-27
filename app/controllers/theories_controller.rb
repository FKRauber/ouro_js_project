class TheoriesController < ApplicationController

  # THEORY CREATION
  def new
    treasure
    @theory = Theory.new
  end
  def create
    treasure
    @theory = @treasure.theories.build(theory_params)
    @theory.user_id = current_user.id
    if @theory.save
      redirect_to @treasure, notice: "Theory was successfully saved"
    else
      render :new
    end
  end

  # THEORY EDIT
  def edit
    theory
    treasure
  end
  def update
    treasure
    theory.update(theory_params)
    if theory.save
      redirect_to treasure_path(@treasure), notice: "Theory was successfully updated"
    else
      render :edit
    end
  end

  # THEORY DESTROY
  def destroy
    treasure
    theory.destroy
    redirect_to treasure_path(@treasure), notice: "Theory was successfully destroyed"
  end

  # THEORY LIST - RECENT 3
  def recent
    @theories = Theory.recent_theories
  end

  private

  def theory
    @theory = Theory.find_by(id: params[:id])
  end

  def treasure
    @treasure = Treasure.find_by(id: params[:treasure_id])
  end

  def theory_params
    params.require(:theory).permit(:name, :description, :issues, :success, :prove_date, :creator, :treasure_id, :user_id)
  end

end
