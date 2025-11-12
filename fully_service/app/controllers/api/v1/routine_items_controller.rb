class Api::V1::RoutineItemsController < ApplicationController
  before_action :set_routine

  def create
    item = @routine.routine_items.new(item_params)
    if item.save
      render json: item, status: :created
    else
      render json: { errors: item.errors }, status: :unprocessable_entity
    end
  end

  def update
    item = @routine.routine_items.find(params[:id])
    if item.update(item_params)
      render json: item
    else
      render json: { errors: item.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    item = @routine.routine_items.find(params[:id])
    item.destroy
    head :no_content
  end

  private

  def set_routine
    @routine = Routine.find(params[:routine_id])
  end

  def item_params
    params.require(:routine_item).permit(:title, :notes, :start_time, :end_time, :position, :category, :duration_minutes, :mandatory)
  end
end
