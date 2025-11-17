# app/controllers/api/v1/objectifs_controller.rb
module Api
  module V1
    class ObjectifsController < ApplicationController
      before_action :set_objectif, only: [:show, :update, :destroy]

      # GET /api/v1/objectifs
      def index
        @objectifs = Objectif.all
        render json: @objectifs
      end

      # GET /api/v1/objectifs/:id
      def show
        render json: @objectif
      end

      # POST /api/v1/objectifs
      def create
        @objectif = Objectif.new(objectif_params)
        if @objectif.save
          render json: @objectif, objectif_status: :created
        else
          render json: @objectif.errors, objectif_status: :unprocessable_entity
        end
      end

      # PUT /api/v1/objectifs/:id
      def update
        if @objectif.update(objectif_params)
          render json: @objectif
        else
          render json: @objectif.errors, objectif_status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/objectifs/:id
      def destroy
        @objectif.destroy
        head :no_content
      end

      private

      def set_objectif
        @objectif = Objectif.find(params[:id])
      end

      def objectif_params
        params.require(:objectif).permit(:title, :description, :category, :objectif_status, :priority, :target_date, :notes)
      end
    end
  end
end
