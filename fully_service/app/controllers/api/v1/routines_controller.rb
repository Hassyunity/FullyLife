class Api::V1::RoutinesController < ApplicationController
  before_action :set_routine, only: [:show, :update, :destroy]

  def index
    routines = Routine.includes(:routine_items).all
    render json: routines.as_json(include: :routine_items)
  end

  def show
    render json: @routine.as_json(include: :routine_items)
  end

  def create
    routine = Routine.new(routine_params)
    if routine.save
      render json: routine, status: :created
    else
      render json: { errors: routine.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @routine.update(routine_params)
      render json: @routine
    else
      render json: { errors: @routine.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @routine.destroy
    head :no_content
  end

  private

  def set_routine
    @routine = Routine.find(params[:id])
  end

  def routine_params
    params.require(:routine).permit(:title, :description, :public)
  end
end
